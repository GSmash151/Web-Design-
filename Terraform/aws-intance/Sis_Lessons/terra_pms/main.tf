module "ec2_instance" {
  source = "./modules/ec2_instance"
}

module "key_name" {
  source = "./modules/key_pair"
  key_name = module.key_pair.key_name
}