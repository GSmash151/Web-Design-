resource "aws_vpc" "spms_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_subnet" "spms_subnet" {
  vpc_id                  = aws_vpc.spms_vpc.id
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-subnet"
  }

}

resource "aws_internet_gateway" "spms_igw" {
  vpc_id = aws_vpc.spms_vpc.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

resource "aws_route_table" "spms_route_table" {
  vpc_id = aws_vpc.spms_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.spms_igw.id
  }

  tags = {
    Name = "${var.project_name}-route-table"
  }
}

resource "aws_route_table_association" "spam_rta" {
  subnet_id      = aws_subnet.spms_subnet.id
  route_table_id = aws_route_table.spms_route_table.id
}
