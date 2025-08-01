# modules\security_group\main.tf

resource "aws_security_group" "allow_ssh_http" {
  name        = var.name
  description = "Custom security group for SSH access"

  # Default egress rule (allows all outbound traffic)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = var.name
  }
}

# Add custom ingress rules dynamically
resource "aws_security_group_rule" "ingress_rules" {
  count             = length(var.ingress_rules)
  type              = "ingress"
  security_group_id = aws_security_group.allow_ssh_http.id

  from_port                = var.ingress_rules[count.index].from_port
  to_port                  = var.ingress_rules[count.index].to_port
  protocol                 = var.ingress_rules[count.index].protocol
  source_security_group_id = lookup(var.ingress_rules[count.index], "source_security_group_id", null)
  cidr_blocks = lookup(var.ingress_rules[count.index], "cidr_blocks", [])
}
