# modules\security_group\variables.tf

variable "vpc_vpc" {
  description = "The ID of the VPC where the security group will be created"
  type        = string
}

variable "petclinic_vpc" {
  description = "value"
  type        = string
}


variable "ingress_rules" {
  description = "List of ingress rules"
  type = list(object({
    description = string
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))

}




