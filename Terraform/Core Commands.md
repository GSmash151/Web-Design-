- `terraform init`: Initializes a Terraform working directory. This command downloads the necessary plugins and providers for your configuration. It's the first command you should run after creating a new configuration or cloning an existing one. 
- `terraform plan`: Creates an execution plan showing what Terraform will do to reach the desired state defined in your configuration. 
- `terraform apply`: Applies the changes required to reach the desired state, effectively creating or updating your infrastructure. 
- `terraform destroy`: Destroys all resources managed by your Terraform configuration. 
- `terraform validate`: Checks the syntax and structure of your configuration files for errors. 
- `terraform fmt`: Rewrites Terraform configuration files to a standard format and style. 
- `terraform import`: Imports existing infrastructure into your Terraform state, allowing you to manage resources created outside of Terraform. 
- `terraform show`: Displays the current state of your infrastructure or a saved plan file. 
- `terraform refresh`: Refreshes the Terraform state by comparing it with the actual state of your infrastructure. 

Other Useful Commands:
- `terraform version`: Displays the installed Terraform version. 
- `terraform output`: Displays output values from your root module. 
- `terraform graph`: Generates a visual representation of your configuration or execution plan. 
- `terraform taint` & `terraform untaint`: Marks a resource instance as tainted or untainted, which can force recreation during the next `apply`. 
- `terraform workspace`: Manages workspaces to isolate different environments (e.g., development, staging, production). 
- `terraform state`: Provides commands for managing the Terraform state file, such as pulling, pushing, listing, and manipulating state. 
- `terraform providers`: Lists the providers required for your configuration. 
- `terraform login` & `terraform logout`: Used for logging in and out of remote hosts like Terraform Cloud.