# robot-allen

Want a Library of Allenxandria gif but don't know which one? Let Robot Allen decide for you!

To add Allenbot to your server please contact me and I'll provide you with the link.

The bot currently runs on all channels.

If you have any ideas/bugs/issues please create an issue here or message me `@KaizaCorp#1337` on Discord to let me know! 

Search through all the current gifs by checking out the [React front end](https://kaizacorp.github.io/allenbot/)

Commands:
--

`!gif` to randomly choose an Allen gif.

`!gif <term1> <term2> ...` to search for an Allen gif with the matching tags.

`!tbr <option1> <option2> ...` to have Robot Allen choose what you should read next (titles with spaces can be used with quotes).

`!tbr <goodreads/storygraph shelf link>` to have Robot Allen randomly select one of your books for you to read (profile must be public for goodreads).

`!count` to display the current count of Allenxandria gifs.

`!help <command>` to display command usage.

`!tags <url>` to display all tags for a given Allen gif url.

Any messages where the first word contains 'allenbot' is equivalent to `!gif` -> will respond with a random gif.




TODO:
--

+ refactor tbr.js into smaller functions -> too large / multiple purposes
+ migrate from fetch to axios
+ Properly sanitize inputs for dealing with mixtures of quote types for `!tbr` (both types of double quotes working, but not single quotes currently)
+ handle storygraph shelf infinite scroll for `!tbr`
+ use logging library
