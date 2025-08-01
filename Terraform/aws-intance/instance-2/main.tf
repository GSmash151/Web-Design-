# main.tf
terraform {
  required_version = ">=1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# Provider configuration
provider "aws" {
  region = "us-east-1"

}

# Call the key_pair module to create an SSH key pair
module "key_pair" {
  source   = "./modules/key_pair"
  key_name = var.key_name
}

# Call the security_group module to create security groups for each instance
module "security_group_1" {
  source = "./modules/security_group"
  name   = "instance-1-sg"
  ingress_rules = [
    # Allow SSH from your PC (replace YOUR_IP with your public IP)
    {
      from_port = 22
      to_port = 22
      protocol = "tcp"
      cidr_blocks = ["148.101.225.207/32"]

    },
     # Allow SSH from Client-1 to Client-2
    {
      from_port                = 22
      to_port                  = 22
      protocol                 = "tcp"
      source_security_group_id = module.security_group_2.security_group_id
    },
    # Allow SSH from Client-1 to Server
    {
      from_port                = 22
      to_port                  = 22
      protocol                 = "tcp"
      source_security_group_id = module.security_group_3.security_group_id
    },
    # Allow HTTP (port 80) from anywhere
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  ]
}

module "security_group_2" {
  source = "./modules/security_group"
  name   = "instance-2-sg"
  ingress_rules = [{
    from_port                = 22
    to_port                  = 22
    protocol                 = "tcp"
    source_security_group_id = module.security_group_1.security_group_id
    },
    # Allow SSH from Client-1 to Client-2
    {
      from_port                = 22
      to_port                  = 22
      protocol                 = "tcp"
      source_security_group_id = module.security_group_3.security_group_id
    }    
  ]
}

module "security_group_3" {
  source = "./modules/security_group"
  name   = "instance-3-sg"
  ingress_rules = [{
    from_port                = 22
    to_port                  = 22
    protocol                 = "tcp"
    source_security_group_id = module.security_group_1.security_group_id
    },
    # Allow SSH from Client-2 to Server
    {
      from_port                = 22
      to_port                  = 22
      protocol                 = "tcp"
      source_security_group_id = module.security_group_2.security_group_id
    }
  ]
}

# Call the ec2_instance module to create 3 EC2 instances
module "ec2_instance_1" {
  source            = "./modules/ec2_instance"
  name              = "client-1"
  ami               = var.ami
  instance_type     = var.instance_type
  key_name          = module.key_pair.key_name
  security_group_id = module.security_group_1.security_group_id
}

module "ec2_instance_2" {
  source            = "./modules/ec2_instance"
  name              = "client-2"
  ami               = var.ami
  instance_type     = var.instance_type
  key_name          = module.key_pair.key_name
  security_group_id = module.security_group_2.security_group_id
}

module "ec2_instance_3" {
  source            = "./modules/ec2_instance"
  name              = "server"
  ami               = var.ami
  instance_type     = var.instance_type
  key_name          = module.key_pair.key_name
  security_group_id = module.security_group_3.security_group_id
}
