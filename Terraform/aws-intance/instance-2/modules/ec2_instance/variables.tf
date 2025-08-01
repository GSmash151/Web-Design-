# modules\ec2_instance\variables.tf

variable "ami" {
  description = "AMI ID for the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
}

variable "key_name" {
  description = "SSH key name"
  type        = string
}

variable "security_group_id" {
  description = "Security group ID"
  type        = string
}

variable "name" {
  description = "Name tag for the EC2 instance"
  type = string
}