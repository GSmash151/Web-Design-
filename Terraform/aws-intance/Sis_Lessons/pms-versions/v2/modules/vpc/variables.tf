variable "vpc_name" {
  description = "Name of the VPC"
  type        = string
}
variable "vpc_security_group_ids" {
  description = "VPC IDs"
  type        = list(string)
}
variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}




