---
title: Configuration management with Ansible
date: 2017-03-02
summary: My first project as a graduate software engineer at HealthEngine where I used Ansible to manage our production infrastructure
slug: configuration-management-ansible
---

This was originally posted on the HealthEngine blog at: https://blog.healthengine.com.au/configuration-management-ansible/.

I'd like to share a story of success from my first project as a graduate software engineer in which I had free reign with HealthEngine to achieve the outcomes required.

## Objective
The project objective started out being to automate the process of creating new development environments (eg. for new team members) and has since grown to include automating and managing the configuration of every aspect of our production environment. We also wanted to allow every developer to easily contribute changes to the software stack running their code.

## The old way
Before we started this project, the software stack included a number of AWS EC2 instances with:

- Ubuntu 14.04
- PHP 5.5
- Apache 2.4 with MPM worker and FastCGI
- PostgreSQL 9.5
- Varnish 4.1
- Nginx 1.1.19
- Node 0.6

The development environment was a single virtual machine running the LAPP stack (Linux, Apache, PHP, PostgreSQL) which would be copied to a USB stick and shared with new starters. It contained a slightly condensed and sanitised backup of the live database and everything else was ready to go. This was a pretty easy way to get a new starter up and running, but it is very obtuse, and hadn't been updated for quite some time. It also led to a silo of knowledge where only a few people knew exactly what was needed to run our code.

The largest issue with this setup was making changes to the configuration or installing new tools as development progressed. A lesser, secondary issue, was that not everyone knew what our stack was. Some would argue that this separation of concerns is a good thing, but it was taken to the extreme, to the point where it was more detrimental than it was beneficial.

## The new way
This is where Ansible, Vagrant and Packer stepped in. We are now using these three tools to manage our configuration across environments. To paraphrase the homepage of each, Ansible is a configuration management tool similar to Chef or Puppet, written in python; Vagrant is used to manage development environments and is written in Ruby; and Packer is a tool to automate building machine images, written in Go.

[Vagrant](https://www.vagrantup.com/) is only used in development to improve the management of environments. It allows us to create, destroy, power on and SSH into a virtual machine, each with a single command. This is a huge improvement on the old USB shared image. We are also working on improving the database used in development. In the future, we hope this will plug into more automated testing as well.

We use [Packer](https://www.packer.io/) in both production and development to automate the creation of Ubuntu images. Packer boots a new machine (running on EC2 or either VirtualBox or VMware, among others), installs Ubuntu and a minimum set of tools to allow Ansible to take over in the next step.

We can then boot up a new instance built by Packer and run [Ansible](https://www.ansible.com/) against it to install all the packages and configure the machine to perform its specific role.

The combination of these tools means that our configuration is almost self documenting (because Ansible uses YAML to define configuration), but is also semi-automated. Whereas previously, an EC2 instance was created manually by one of our devops members launching an Ubuntu instance, installing and configuring the required software, then saving it as an AMI; the new process now involves booting an instance and running Ansible on it to install and configure everything automatically. This is a much more streamlined approach that allows for much easier modification and upgrading. It has also enabled more specific configuration for the role each machine fulfills, such as not running a webserver if not required.

## Our new stack
We now run three separate VM's in development; one for the database and two others running the LAPP stack and a small Node app proxied through nginx. This may be slightly overkill, but through the use of these tools we can destroy and recreate the environments as we need, so not all must be running at the same time.

In production we now (or will soon) have six different types of AMIs performing different tasks - all managed through Ansible. Each one is running Ubuntu 16.04 and has a combination:

- Apache 2.4 with MPM event and FastCGI
- PHP7.0 FPM and CLI SAPIs
- Varnish 4.1
- PHP Resque Asynchronous task runner
- CRON
- nginx 1.10
- Node 4.2

We also use the [Elastic Stack](https://www.elastic.co/) to ingest and view logs from each instance in a central location. The configuration of these are also managed with Ansible.

## Results
Where this initial process to implement configuration management and upgrade to newest versions took a few months, it should now take less than a day to repeat the process. For example, we are planning to upgrade to PHP 7.1 towards the end of March (there are some deprecations we need to handle beforehand) which should be as simple as swapping out the official Ubuntu 16.04 repo for a custom one with PHP7.1 and re-running Ansible on each machine.

We are now in the final stages of the project, performing some refactoring and training on the new tools and process before moving on to the next phase; improving our deployment process. We want to allow as many developers as possible to comfortably, quickly and safely deploy new code to production.

Overall, I’m happy with the results of the project and the knowledge I have gained. Every team member can now benefit from knowing exactly what state our environment is in and can create new environments or modify existing ones very quickly. I have thoroughly enjoyed getting into the nitty-gritty of server architecture.
