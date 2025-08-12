resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "tls_private_key" {
  content = tls_private_key.generated.private_key_pem
  filename = "${path.module}/aws_key_pair.pem"
}

resource "aws_key_pair" "generated_key" {
  depends_on = [ tls_private_key.rsa_4096 ]
  key_name   = "aws_key_pair"
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

