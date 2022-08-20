## Bus Ticket System

**Prerequisites**

 - [Docker](https://www.docker.com/products/docker-desktop/) (*wsl2 integration recommended*)
 - [GNU Make](http://gnuwin32.sourceforge.net/packages/make.htm) 
 - [Composer](https://getcomposer.org/download/)
 > For admin login, username is **admin** and password is **root**.

## About
This system is about booking ticket for buses. There are two roles in this system **—** admin and user. Admin manage routes and user can explore those routes and book.

## Installation
1. First, install docker and composer.
2. Clone this repository.
3. Then create a docker network named **bus-ticket-network**.`docker network create bus-ticket-network`
4. In frontend directory, type `make init`, then `make run`. You should see development server running in terminal.
5. In src directory of backend, type `composer install`.
6. Then in root directory of backend, type `make init`.
