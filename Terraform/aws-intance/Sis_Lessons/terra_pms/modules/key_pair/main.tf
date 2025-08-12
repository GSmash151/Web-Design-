resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = "aws_key_pair"
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

resource "local_file" "aws_key_pair" {
  depends_on      = [aws_key_pair.generated_key]
  content         = tls_private_key.rsa_4096.private_key_pem
  filename        = "aws_key_pair.pem"
  file_permission = "0400"
}
