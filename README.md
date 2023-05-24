## Authentication template

This templates doesn't have any auth provider implemented. It's just the implementation of protected views through the use of 2 HOC components

- UserLayour

- VisitorLayout

Each of those components have two primary functions. First is creating a templated layour for pages that are supposed to be visited by visitors or authenticated users. Lastly, it provides some logic to route users depending on their authentication status. If they're users and they go to the login page, It should redirect them to the entry point for authenticated users (private page). If they're visitors and try to visit a user page, it should kick them to login while not showing any parts of the user page. 

The main logic for managing the status is in the AppContext. It is pretty empty since listeners for managing authentication status and their changes is platform specific.

I will try to created more branches off this one to implement popular cases like Firebase, Auth0 and Supabase.
