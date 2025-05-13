package main

import (
	"context"
	"fmt"
	"log"

	"github.com/weaviate/weaviate-go-client/v5/weaviate"
	"github.com/weaviate/weaviate-go-client/v5/weaviate/auth"
	"github.com/weaviate/weaviate-go-client/v5/weaviate/rbac"
	"github.com/weaviate/weaviate/entities/models"
)

func main() {
	// Initialize client and demonstrate RBAC functionality
	client := initClient()

	// Example operations
	createRoleWithRoleManagementPermissions(client)

	checkRoleExists(client)
	inspectRole(client)
	listAllRoles(client)
	listUsersWithRole(client)

	deleteRole(client)
	createRoleWithCollectionsPermissions(client)
	deleteRole(client)
	createRoleWithTenantPermissions(client)
	deleteRole(client)
	createRoleWithDataObjectPermissions(client)
	deleteRole(client)
	createRoleWithBackupPermissions(client)
	deleteRole(client)
	createRoleWithClusterPermissions(client)
	deleteRole(client)
	createRoleWithNodesPermissions(client)

	addPermissionsToRole(client)
	removePermissionsFromRole(client)
	// deleteRole(client)
	// Additional examples can be called here
}

// START AdminClient
// Connect to Weaviate as root user
func initClient() *weaviate.Client {
	cfg := weaviate.Config{
		Host:   "localhost:8580",
		Scheme: "http",
		AuthConfig: auth.ApiKey{
			Value: "root-user-key",
		},
	}
	client, err := weaviate.NewClient(cfg)
	if err != nil {
		log.Fatalf("Error creating client: %v", err)
	}
	return client
}

// END AdminClient

// START AddManageRolesPermission
func createRoleWithRoleManagementPermissions(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Create a role with Role Management permissions
	err := rolesClient.Creator().WithRole(rbac.NewRole("testRole",
		rbac.RolesPermission{
			Role: "testRole*", // Applies to all roles starting with "testRole"
			Actions: []string{
				models.PermissionActionCreateRoles, // Allow creating roles
				models.PermissionActionReadRoles,   // Allow reading roles
				models.PermissionActionUpdateRoles, // Allow updating roles
				models.PermissionActionDeleteRoles, // Allow deleting roles
			},
			Scope: models.PermissionRolesScopeMatch, // Only allow role management with the current user's permission level
			// Scope: models.PermissionRolesScopeAll, // Allow role management with all permissions
		})).Do(ctx)

	if err != nil {
		log.Fatalf("Error creating role: %v", err)
	}
	fmt.Println("Role created with role management permissions")
}

// END AddManageRolesPermission

// START AddCollectionsPermission
func createRoleWithCollectionsPermissions(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Create a role with Collections permissions
	err := rolesClient.Creator().WithRole(rbac.NewRole("testRole",
		rbac.CollectionsPermission{
			Collection: "TargetCollection*", // Applies to all collections starting with "TargetCollection"
			Actions: []string{
				models.PermissionActionCreateCollections, // Allow creating new collections
				models.PermissionActionReadCollections,   // Allow reading collection info/metadata
				models.PermissionActionUpdateCollections, // Allow updating collection configuration
				models.PermissionActionDeleteCollections, // Allow deleting collections
			},
		})).Do(ctx)

	if err != nil {
		log.Fatalf("Error creating role: %v", err)
	}
	fmt.Println("Role created with collections permissions")
}

// END AddCollectionsPermission

// START AddTenantPermission
func createRoleWithTenantPermissions(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Create a role with Tenant permissions
	err := rolesClient.Creator().WithRole(rbac.NewRole("testRole",
		rbac.TenantsPermission{
			//Collection: "TargetCollection*", // Applies to all collections starting with "TargetCollection"
			//Tenant:     "TargetTenant*",     // Applies to all tenants starting with "TargetTenant"
			Actions: []string{
				models.PermissionActionCreateTenants, // Allow creating new tenants
				models.PermissionActionReadTenants,   // Allow reading tenant info/metadata
				models.PermissionActionUpdateTenants, // Allow updating tenant states
				models.PermissionActionDeleteTenants, // Allow deleting tenants
			},
		})).Do(ctx)

	if err != nil {
		log.Fatalf("Error creating role: %v", err)
	}
	fmt.Println("Role created with tenant permissions")
}

// END AddTenantPermission

// START AddDataObjectPermission
func createRoleWithDataObjectPermissions(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Create a role with Data Object permissions
	err := rolesClient.Creator().WithRole(rbac.NewRole("testRole",
		rbac.DataPermission{
			Collection: "TargetCollection*", // Applies to all collections starting with "TargetCollection"
			//Tenant:     "TargetTenant*",     // Applies to all tenants starting with "TargetTenant"
			Actions: []string{
				models.PermissionActionCreateData, // Allow data inserts
				models.PermissionActionReadData,   // Allow query and fetch operations
				models.PermissionActionUpdateData, // Allow data updates
				// models.PermissionActionDeleteData not included (disallow data deletes)
			},
		})).Do(ctx)

	if err != nil {
		log.Fatalf("Error creating role: %v", err)
	}
	fmt.Println("Role created with data object permissions")
}

// END AddDataObjectPermission

// START AddBackupPermission
func createRoleWithBackupPermissions(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Create a role with Backup permissions
	err := rolesClient.Creator().WithRole(rbac.NewRole("testRole",
		rbac.BackupsPermission{
			Collection: "TargetCollection*", // Applies to all collections starting with "TargetCollection"
			Actions: []string{
				models.PermissionActionManageBackups, // Allow managing backups
			},
		})).Do(ctx)

	if err != nil {
		log.Fatalf("Error creating role: %v", err)
	}
	fmt.Println("Role created with backup permissions")
}

// END AddBackupPermission

// START AddClusterPermission
func createRoleWithClusterPermissions(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Create a role with Cluster Data Access permissions
	err := rolesClient.Creator().WithRole(rbac.NewRole("testRole",
		rbac.ClusterPermission{
			Actions: []string{
				models.PermissionActionReadCluster, // Allow reading cluster data
			},
		})).Do(ctx)

	if err != nil {
		log.Fatalf("Error creating role: %v", err)
	}
	fmt.Println("Role created with cluster access permissions")
}

// END AddClusterPermission

// START AddNodesPermission
func createRoleWithNodesPermissions(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Create a role with Node Data Access permissions (verbose level)
	err := rolesClient.Creator().WithRole(rbac.NewRole("testRole",
		rbac.NodesPermission{
			Collection: "TargetCollection*", // Applies to all collections starting with "TargetCollection"
			Actions: []string{
				models.PermissionActionReadNodes, // Allow reading node metadata
			},
			Verbosity: models.PermissionNodesVerbosityVerbose, // Verbose level
		})).Do(ctx)

	if err != nil {
		log.Fatalf("Error creating role: %v", err)
	}
	fmt.Println("Role created with verbose node access permissions")

	deleteRole(client)

	// Create a role with Node Data Access permissions (minimal level)
	// The `minimal` verbosity level applies to all collections unlike
	// the `verbose` level where you specify the collection name filter
	err = rolesClient.Creator().WithRole(rbac.NewRole("testRole",
		rbac.NodesPermission{
			Collection: "TargetCollection*", // Applies to all collections starting with "TargetCollection"
			Actions: []string{
				models.PermissionActionReadNodes, // Allow reading node metadata
			},
			Verbosity: models.PermissionNodesVerbosityMinimal, // Minimal level
		})).Do(ctx)

	if err != nil {
		log.Fatalf("Error creating role: %v", err)
	}
	fmt.Println("Role created with minimal node access permissions")
}

// END AddNodesPermission

// START AddRoles
func addPermissionsToRole(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Add data create permission for TargetCollection* to the role "testRole"
	dataPermission := rbac.DataPermission{
		Collection: "TargetCollection*",
		Actions: []string{
			models.PermissionActionCreateData, // Allow data inserts
		},
	}

	// Add the permission to an existing role
	err := rolesClient.PermissionAdder().
		WithRole("testRole").
		WithPermissions(dataPermission).
		Do(ctx)

	if err != nil {
		log.Fatalf("Error adding permissions: %v", err)
	}
	fmt.Println("Added data create permission to role")
}

// END AddRoles

// START RemovePermissions
func removePermissionsFromRole(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Remove data read permission from the role "testRole"
	dataPermission := rbac.DataPermission{
		Collection: "TargetCollection*",
		Actions: []string{
			models.PermissionActionCreateData, // Remove read permission
		},
	}

	// Remove the permissions from the role
	err := rolesClient.PermissionRemover().
		WithRole("testRole").
		WithPermissions(dataPermission).
		Do(ctx)

	if err != nil {
		log.Fatalf("Error removing permissions: %v", err)
	}
	fmt.Println("Removed permissions from role")
}

// END RemovePermissions

// START CheckRoleExists
func checkRoleExists(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Check if the role exists
	exists, err := rolesClient.Exists().
		WithName("testRole").
		Do(ctx)

	if err != nil {
		log.Fatalf("Error checking role: %v", err)
	}
	fmt.Printf("Role 'testRole' exists: %v\n", exists)
}

// END CheckRoleExists

// START InspectRole
func inspectRole(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Get the role details
	role, err := rolesClient.Getter().
		WithName("testRole").
		Do(ctx)

	if err != nil {
		log.Fatalf("Error getting role: %v", err)
	}

	fmt.Printf("Role: %s\n", role.Name)

	// Check collections permissions
	for _, perm := range role.Collections {
		fmt.Printf("Collection Permission: %s\n", perm.Collection)
		fmt.Printf("  Actions: %v\n", perm.Actions)
	}

	// Check data permissions
	for _, perm := range role.Data {
		fmt.Printf("Data Permission: %s\n", perm.Collection)
		fmt.Printf("Actions: %v\n", perm.Actions)
	}

	// Note: You can check other permission types similarly:
	// role.Tenants, role.Backups, role.Nodes, role.Roles, role.Cluster
}

// END InspectRole

// START ListAllRoles
func listAllRoles(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Get all roles
	roles, err := rolesClient.AllGetter().Do(ctx)
	if err != nil {
		log.Fatalf("Error listing roles: %v", err)
	}

	for _, role := range roles {
		fmt.Printf("Role: %s\n", role.Name)

		// Count the different types of permissions
		permissionCounts := map[string]int{
			"collections": len(role.Collections),
			"data":        len(role.Data),
			"tenants":     len(role.Tenants),
			"backups":     len(role.Backups),
			"nodes":       len(role.Nodes),
			"roles":       len(role.Roles),
		}

		// Print the counts
		for permType, count := range permissionCounts {
			if count > 0 {
				fmt.Printf("  Permission Type: %s (count: %d)\n", permType, count)
			}
		}

		// Check if there's a cluster permission
		if role.Cluster != nil {
			fmt.Printf("  Permission Type: cluster\n")
		}
	}
}

// END ListAllRoles

// START AssignedUsers
func listUsersWithRole(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Get users assigned to the role
	users, err := rolesClient.UserAssignmentGetter().
		WithRole("testRole").
		Do(ctx)

	if err != nil {
		log.Fatalf("Error getting users: %v", err)
	}

	for _, user := range users {
		fmt.Printf("User ID: %s, Type: %s\n", user.UserID, user.UserType)
	}
}

// END AssignedUsers

// START DeleteRole
func deleteRole(client *weaviate.Client) {
	ctx := context.Background()

	// Get the roles client
	rolesClient := client.Roles()

	// Check if the role exists before trying to delete it
	exists, err := rolesClient.Exists().
		WithName("testRole").
		Do(ctx)

	if err != nil {
		// If we get a 404, the role doesn't exist, which is fine
		if isNotFoundError(err) {
			fmt.Println("Role 'testRole' doesn't exist, no need to delete")
			return
		}
		// For other errors, we do want to report them
		log.Printf("Error checking if role exists: %v", err)
		return
	}

	if !exists {
		fmt.Println("Role 'testRole' doesn't exist, no need to delete")
		return
	}

	// Delete the role
	err = rolesClient.Deleter().
		WithName("testRole").
		Do(ctx)

	if err != nil {
		log.Printf("Error deleting role: %v", err)
		return
	}
	fmt.Println("Role 'testRole' deleted")

	// Verify the role no longer exists
	exists, err = rolesClient.Exists().
		WithName("testRole").
		Do(ctx)

	if err != nil {
		// If we get a 404, that's expected after deletion
		if isNotFoundError(err) {
			fmt.Println("Verified: Role no longer exists")
			return
		}
		// For other errors, report them but don't fail
		log.Printf("Warning: Error checking if role exists after deletion: %v", err)
		return
	}

	if !exists {
		fmt.Println("Verified: Role no longer exists")
	} else {
		fmt.Println("Warning: Role still exists after deletion")
	}
}

// Helper function to check if an error is a 404 Not Found error
func isNotFoundError(err error) bool {
	return err != nil && (err.Error() == "status code: 404, error:" ||
		err.Error() == "status code: 404" ||
		err.Error() == "not found")
}

// END DeleteRole
