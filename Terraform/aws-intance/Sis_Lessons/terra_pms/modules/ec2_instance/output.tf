output "instance_id" {
  description = "The Ec2 instance Id"
  value = aws_instance.this
}

output "instance_state" {
  description = "The current state of the Ec2 instance"
  value = aws_instance.this.instance_state
}

output "tags" {
  description = "The tags associated with the Ec2 instance"
  value = aws_instance.this.tags_all
}

output "public_ip" {
  description = "The public IP address of the Ec2 instance"
  value = aws_instance.this.public_ip
}
output "private_ip" {   
  description = "The private IP address of the Ec2 instance"
  value = aws_instance.this.private_ip    
}

output "availability_zone" {
  description = "The availability zone where the Ec2 instance"
  value = aws_instance.this.availability_zone
}