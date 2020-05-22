#droplet Ipv4 address   
output "Public_IP" {
  value = "${digitalocean_droplet.movies-api-droplet.ipv4_address}"
}

# floas
output "fip_output" {
  value = "${digitalocean_floating_ip.movies-api-floatingIP.ip_address}"
}
