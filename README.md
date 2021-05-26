# robot-allen

Want a Library of Allenxandria gif but don't know which one? Let Robot Allen decide for you!

Commands include:

`!gif` to randomly choose an Allen gif (using Tenor)


`!gif term1 term2 ...` to search for an Allen gif with the matching tags.

`!tbr option1 option2 ...` to have Robot Allen choose what you should read next (titles with spaces can be used with quotes)

`!tbr <goodreads/storygraph shelf link>` to have Robot Allen randomly select one of your books for you to read.

`!help <command>` to display command usage.


Add Robot Allen to your Discord server by using this link:

https://discord.com/oauth2/authorize?client_id=834824357989318679&scope=bot

The bot currently runs on all channels. This is my first Discord bot so please bear with me.

If you have any ideas/bugs/issues please create an issue here or message me @KaizaCorp#6992 on Discord to let me know! 

**TODO:**

+ Properly sanitize inputs for dealing with mixtures of quote types for `!tbr` (both types of double quotes working, but not single quotes currently)

+ Tidy up title/author message after random choice (handle weird titles, extract series, handle many authors)

+ allow for preview-quelled links in Discord (i.e. `!tbr <url>`)

+ set to random gif when matching tag not found?

+ handle storygraph shelf infinite scroll
