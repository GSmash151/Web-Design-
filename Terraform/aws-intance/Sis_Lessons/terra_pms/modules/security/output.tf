output "security_group_name" {
  value = aws_security_group.petclinic_sg.name
}

output "security_group_id" {
  value = aws_security_group.petclinic_sg.id
}
