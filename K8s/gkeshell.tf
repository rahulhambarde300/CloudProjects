# Configure the Google Cloud provider
provider "google" {
  project = "cloud-427713"
  region  = "us-central1"
}

resource "google_container_cluster" "primary" {
  name = "cloud-cluster"
  location = "us-central1-a"

  deletion_protection = false
  node_config {
        machine_type = "e2-micro"
        disk_type = "pd-standard"
        disk_size_gb = 10
        image_type = "COS_CONTAINERD"
        oauth_scopes = ["https://www.googleapis.com/auth/cloud-platform"]
    }

    initial_node_count = 1

}

output "cluster_name" {
  value = google_container_cluster.primary.name
}