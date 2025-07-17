## Eventos

- '/new-event' to create a new event (post). it requires the fields name, participants, date, createdBy
- '/change-event' to change a new event (put)
- '/delete-event/:eventId' to delete an event (delete)
- '/events' to get events (get)
- '/events/:eventId/participants' to add the logged in user to an event (post)

## Usuario

'/register' to sign up an user. it requires the fields name:string, surname:string, age:number, interests:listofstrings
'/login' to log in
'/logout' to log out
