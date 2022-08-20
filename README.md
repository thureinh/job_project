# Bus Ticket System
This is a simple/small scale project for job entry.

## Prerequisites

 - [Docker](https://www.docker.com/products/docker-desktop/) (*wsl2 integration recommended*)
 - [GNU Make](http://gnuwin32.sourceforge.net/packages/make.htm) 
 - [Composer](https://getcomposer.org/download/)
 > For admin login, username is **admin** and password is **root**.

## About
This system is about booking ticket for buses. There are two roles in this system **—** admin and user. Admin manage routes and user can explore those routes and book.

## Installation
 1. First, install docker and composer.
 2. Clone this repository.

> If error occur in cloning process due to zone.identifier file, run this command as administrator`git config --system core.protectNTFS false` and then clone again.

 3. In **[project_dir]/backend/src**, make `composer install`.
 4. Then create a docker network named **bus-ticket-network**, type`docker network create bus-ticket-network`
 5. In **[project_dir]/frontend**, type `make init`, then `make run`. You should see development server running in terminal.
 6. Then in **[project_dir]/backend**, type `make init`.
 7. After that, run `make fresh-seed`
