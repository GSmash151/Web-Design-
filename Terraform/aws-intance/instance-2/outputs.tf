output "ec2_instance_1_public_ip" {
  value       = module.ec2_instance_1.instance_public_ip
  description = "Public IP of Instance 1"
}

output "ec2_instance_2_public_ip" {
  value       = module.ec2_instance_2.instance_public_ip
  description = "Public IP of Instance 2"
}

output "ec2_instance_3_public_ip" {
  value       = module.ec2_instance_3.instance_public_ip
  description = "Public IP of Instance 3"
}
