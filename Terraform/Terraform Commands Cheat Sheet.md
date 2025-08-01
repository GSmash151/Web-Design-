
# Terraform Commands Cheat Sheet

## Initialization and Setup
- `terraform init`: Initializes a working directory containing Terraform configuration files. Downloads required providers and modules.
- `terraform get`: Downloads and updates modules mentioned in the configuration.

## Planning and Validation
- `terraform plan`: Creates an execution plan, showing what changes Terraform will make to your infrastructure without applying them.
- `terraform validate`: Validates the configuration files for syntax correctness and consistency.
- `terraform fmt`: Rewrites Terraform configuration files to a canonical format and style.

## Apply and Destroy
- `terraform apply`: Applies the changes required to reach the desired state of the configuration. Prompts for confirmation by default.
- `terraform apply -auto-approve`: Applies the changes without prompting for confirmation.
- `terraform destroy`: Destroys all resources defined in the Terraform configuration. Prompts for confirmation by default.
- `terraform destroy -auto-approve`: Destroys all resources without prompting for confirmation.

## State Management
- `terraform state list`: Lists all resources managed by the current Terraform state.
- `terraform state show <resource>`: Shows detailed information about a specific resource in the Terraform state.
- `terraform state rm <resource>`: Removes a specific resource from the Terraform state file (does not destroy the resource in the cloud).
- `terraform state mv <source> <destination>`: Moves or renames a resource within the Terraform state file.

## Output and Debugging
- `terraform output`: Displays the outputs defined in the Terraform configuration.
- `terraform output <output_name>`: Displays the value of a specific output.
- `terraform console`: Opens an interactive console for evaluating expressions against the current state.
- `TF_LOG=DEBUG terraform apply`: Runs Terraform with debug logging enabled for troubleshooting.

## Workspace Management
- `terraform workspace new <workspace_name>`: Creates a new Terraform workspace.
- `terraform workspace select <workspace_name>`: Switches to an existing Terraform workspace.
- `terraform workspace list`: Lists all available workspaces.
- `terraform workspace delete <workspace_name>`: Deletes a specified Terraform workspace.

## Miscellaneous
- `terraform version`: Displays the current Terraform version.
- `terraform providers`: Lists the providers used in the current configuration.
- `terraform import <resource> <id>`: Imports existing infrastructure into Terraform state.
- `terraform taint <resource>`: Marks a resource as tainted, forcing it to be destroyed and recreated on the next apply.
- `terraform untaint <resource>`: Removes the tainted status from a resource.
- `terraform graph`: Generates a visual representation of the Terraform dependency graph (outputs DOT format for visualization tools like Graphviz).

## Cloud Integration (Terraform Cloud/Enterprise)
- `terraform login`: Logs in to Terraform Cloud or Terraform Enterprise.
- `terraform logout`: Logs out of Terraform Cloud or Terraform Enterprise.