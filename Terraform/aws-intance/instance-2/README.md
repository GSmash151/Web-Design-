terraform-project/
├── main.tf               # Root module: Calls child modules and defines providers
├── variables.tf          # Defines input variables
├── outputs.tf            # Defines outputs (e.g., public IPs)
├── providers.tf          # Configures Terraform providers
├── .env                  # Stores AWS credentials securely
├── .gitignore            # Prevents sensitive files from being committed
├── modules/              # Directory for reusable modules
│   ├── ec2_instance/     # Module for creating EC2 instances
│   │   ├── main.tf       # Resource definitions for EC2 instances
│   │   ├── variables.tf  # Input variables for the EC2 module
│   │   ├── outputs.tf    # Outputs from the EC2 module
│   ├── key_pair/         # Module for managing SSH key pairs
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   ├── security_group/   # Module for managing security groups
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
└── README.md             # Documentation for the project