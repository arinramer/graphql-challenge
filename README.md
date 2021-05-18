How to use:

*first time only* Type "npm i" in the console to install the dependencies
Type "npm run dev" to start the server
In your browser, navigate to http://localhost:5000/graphql to access the graphiql interface

Use the the following queries to access the data you want

To list all the apps:

```
{
	apps {
      id
	}
}
```

To query a single app:

```
{
	app(id: "id-goes-here") {
      id
	}
}
```

To list all the stages:

```
{
	stages {
      id
      name
	}
}
```

To query a single stage:

```
{
	stage(id: "id-goes-here") {
      id
      name
	}
}
```

To search the stages by name:

```
{
	stage(name: "name-goes-here") {
      id
      name
	}
}
```

To list all of the events:

```
{
	events {
      id
      appId
      stageId
      name
      description
      image
      startsAt
      endsAt
   }
}
```

To query a single event:

```
{
    event(id: "id-goes-here") {
      id
      appId
      stageId
      name
      description
      image
      startsAt
      endsAt
    }
}
```

To search the events by name:

```
{
    event(name: "name-goes-here") {
      id
      appId
      stageId
      name
      description
      image
      startsAt
      endsAt
    }
}
```

To query the events that occur between two dates:

```
{
    events(startsAt: integer, endsAt: integer) {
      id
      appId
      stageId
      name
      description
      image
      startsAt
      endsAt
    }
}
```

To list all of the events in an app:

```
{
	app(id: "id-goes-here") {
      id
      events {
        id
        appId
        stageId
        name
        description
        image
        startsAt
        endsAt
      }
	}
}
```

To list all of the stages in an app:

```
{
	app(id: "id-goes-here") {
      id
      stages {
        id
        name
      }
	}
}
```

To get the stage in an event:

```
{
    event(id: "id-goes-here") {
      name
      stage {
        id
        name
      }
    }
}
```

To list the events in a stage:

```
{
	stage(id: "id-goes-here") {
      id
      name
	}
}
<<<<<<< HEAD
```
=======
>>>>>>> fa7a5db0137ee0eafd8f2d21abf1d7e2895f1251
