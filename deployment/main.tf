resource "digitalocean_droplet" "movies-api-droplet" {
    image = "docker-18-04"
    name = "movies-api"
    region = "nyc1"
    size = "s-1vcpu-2gb"
    private_networking = true
    ssh_keys = [
      var.ssh_fingerprint
    ]
  connection {

    host = self.ipv4_address
    user = "root"
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }
  provisioner "remote-exec" {
    inline = [
      "export PATH=$PATH:/usr/bin",
      # install ELK Stack
      "sudo apt-get update",
      "sudo apt-get -y install unzip",
      "curl -LOk https://github.com/deviantony/docker-elk/archive/master.zip",
      "unzip master.zip",
      "cd docker-elk-master/",
      "docker-compose up -d",
      "cd ../",
      "rm -r docker-elk-master/",
      # Install and run Redis
      "docker run -d -p 6379:6379 --name redis-cache-container -v /data:/data redis --appendonly yes",
      #Install and run jaeger
      "docker run -d --name jaeger -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 -p 5775:5775/udp -p 6831:6831/udp -p 6832:6832/udp -p 5778:5778 -p 16686:16686 -p 14268:14268 -p 14250:14250 -p 9411:9411 jaegertracing/all-in-one:1.17"
    ]
  }
}

# Create new Floating IP
resource "digitalocean_floating_ip" "movies-api-floatingIP" {
  droplet_id = digitalocean_droplet.movies-api-droplet.id
  region     = digitalocean_droplet.movies-api-droplet.region
}