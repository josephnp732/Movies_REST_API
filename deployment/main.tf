resource "aws_instance" "movies-instance" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "Lab2"

  tags = {
    Name = "movies-api"
  }

  user_data = data.template_file.user_data.rendered
}

data "template_file" "user_data" {
  template = file("scripts/install_docker.sh")
}
