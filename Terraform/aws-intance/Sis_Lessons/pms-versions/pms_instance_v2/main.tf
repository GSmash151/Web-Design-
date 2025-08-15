# main.tf
module "vpc" {
  source = "./modules/vpc"
}

module "security_group" {
  source        = "./modules/security_group"
  petclinic_vpc = "petclinic_vpc"
  vpc_id        = module.vpc.vpc_id
  name          = "petclinic_sg"
  ingress_rules = [
    {
      description = "SSH"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["179.53.36.64/32"]
    },
    {
      description = "HTTP"
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }, 
    {
      description = "Config Server"
      from_port = 8888
      to_port = 8888
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "Api Gateway"
      from_port = 8080
      to_port = 8080
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "Admin Server"
      from_port = 9090
      to_port = 9090
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "Discovery Server"
      from_port = 8761
      to_port = 8761
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
     description = "Zipkin"
      from_port = 9411  
      to_port = 9411
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "Grafana Dashboards"
      from_port = 3000
      to_port = 3000
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "Prometheus"
      from_port = 9091
      to_port = 9091
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  ]
}
module "key_pair" {
  source   = "./modules/key_pair"
  key_name = "sis_key_pair"

}

module "ec2_instances" {
  source                 = "./modules/ec2_instances"
  subnet_id              = module.vpc.subnet_id
  key_name               = module.key_pair.key_name
  vpc_security_group_ids = [module.security_group.security_group_id]

}







