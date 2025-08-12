output "key_name" {
  description = "The key pair name"
  value       = aws_key_pair.generated_key.key_name
}

output "public_key" {
  description = "Aws public key pair"
  value       = tls_private_key.rsa_4096.public_key_openssh

}

output "private_key_pem" {
  description = "The private key in PEM  format"
  value       = tls_private_key.rsa_4096.private_key_pem
  sensitive   = true
}

output "private_key_filename" {
  description = "The filename where the private key is stored"
  value       = local_file.private_key.filename
  sensitive   = true
}
