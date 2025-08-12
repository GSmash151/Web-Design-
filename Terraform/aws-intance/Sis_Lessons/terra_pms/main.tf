module "ec2_instance" {
  source = "./modules/ec2_instance"
}

module "key_name" {
  source = "./modules/key_pair"
  key_name = "aws_key_pair"
}

module "security_group" {
  source = "./modules/security"
  sg_name = module.sg_name
}

module "aws_vpc" {
  source = "./modules/vpc"
  vpc_name = module.vpc.vpc_name
  vpc_security_group_ids = vpc_security_group_ids
    
}