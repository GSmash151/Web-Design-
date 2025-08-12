resource "aws_security_group" "petclinic_sg" {
  name        = var.sg_name
  description = "Security group for the App"

  dynamic "ingress" {
    for_each = var.sg_ingress_rules
    content {
      description = ingress.value["description"]
      from_port   = ingress.value["from_port"]
      to_port     = ingress.value["to_port"]
      protocol    = ingress.value["protocol"]
      cidr_blocks = ingress.value["cidr_blocks"]
      self        = ingress.value["self"]
    }
  }
  dynamic "egress" {
    for_each = var.sg_egress_rules
    content {
      description = egress.value["description"]
      from_port   = egress.value["from_port"]
      to_port     = egress.value["to_port"]
      protocol    = egress.value["protocol"]
      cidr_blocks = egress.value["cidr_blocks"]
      self        = egress.value["self"]
    }
  }
  tags = {
    Name = var.sg_name
  }
}
