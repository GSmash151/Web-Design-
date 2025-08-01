# modules\security_group\variables.tf
variable "name" {
  description = "Name of the security group"
  type        = string
}

variable "ingress_rules" {
  description = "List of ingress rules for the security group"
  type = list(object({
    from_port                = number
    to_port                  = number
    protocol                 = string
    source_security_group_id = optional(string)
    cidr_blocks              = optional(list(string))  
  }))
  default = []
}
