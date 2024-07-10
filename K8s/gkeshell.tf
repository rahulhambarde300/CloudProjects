provider "google" {
  project = "cloud-427713"
  region  = "us-central1"
}

resource "google_container_cluster" "primary" {
  name = "cloud-cluster"
  location = "us-central1-a"

  deletion_protection = false
  node_config {
         machine_type = "e2-medium"
          disk_type    = "pd-balanced"
          disk_size_gb = 100
          image_type   = "COS_CONTAINERD"
          oauth_scopes = [
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/monitoring",
            "https://www.googleapis.com/auth/service.management.readonly",
            "https://www.googleapis.com/auth/servicecontrol",
            "https://www.googleapis.com/auth/trace.append",
          ]
    }

    initial_node_count = 1

}

output "cluster_name" {
  value = google_container_cluster.primary.name
}