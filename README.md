# Practice API built with Nest JS.

This is a practice API built with [Nest JS](https://nestjs.com/).

## Hexagonal Architecture

This API is following the [Hexagonal Architecture](https://martinfowler.com/bliki/HexagonalArchitecture.html).

## Folder Structure

`application`

- application layer contains the application services, facades, and interfaces for interaction with external systems.

`domain`

- domain layer contains the business entities and value objects.

`infrastructure`

- infrastructure layer contains data access components such repositories for interacting with external systems ie the implementation of application interfaces(ports).

`presenters`

- presenters layer contains controllers, gateways, and user facing components.
