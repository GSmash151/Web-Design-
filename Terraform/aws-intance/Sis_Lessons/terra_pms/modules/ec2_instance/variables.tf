variable "name" {
  description = "Aws instance name"
  type        = string
  default     = "Petclinic-MS-App"
}
variable "ami" {
  description = "Amazon Instance"
  type        = string
  default = "ami-08a6efd148b1f7504"
}
variable "instance_type" {
  description = "Instance Type"
  type        = string
  default = "t3.micro"
}

variable "user_data_replace_on_change" {
  description = "Replace all data on changes"
  type        = bool
  default     = true
}
