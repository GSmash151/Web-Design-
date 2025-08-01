# variables.tf
variable "key_name" {
  description = "Name of the SSH key pair"
  type = string
  default = "sis_key_pair"
}

variable "ami" {
  description = "Amazon Linux 2023 AMI ID"
  type = string
  default = "ami-08a6efd148b1f7504"
}

variable "instance_type" {
  description = "EC2 instance type"
  type = string
  default = "t3.micro"
}

