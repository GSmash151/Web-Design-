# spms-app\variables.tf
variable "aws_region" {
  description = "SPMS App instance Region"
  type        = string
}

variable "project_name" {
  description = "The Project Name"
  type        = string
}

variable "vpc_id" {
  description = "The VPC ID"
  type        = string
}

variable "key_name" {
  description = "The Key pair name"
  type        = string
}

variable "user_data_replace_on_change" {
  description = "Replace the instance when user data changes"
  type        = bool
}

variable "user_data" {
  description = "User data script to run on the instance"
  type        = string
}


variable "ami" {
  description = "The AMI ID for the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "The instance type for the EC2 instance"
  type        = string
}

variable "subnet_id" {
  description = "The ID of the subnet where the instance will be launched"
  type        = string
}

variable "security_group_id" {
  description = "A list of security group IDs for the EC2 instance"
  type        = list(string)
}




