# Meetings

You have to organize meetings that lasts 60 minutes.

Provided a file containing your coworkers unavailabilities, find a set of time
where you will all be free to have a meeting.

**Example**

File:

```
1 08:45-12:59
3 11:09-11:28
5 09:26-09:56
5 16:15-16:34
3 08:40-10:12
```

Each entry is in the format:`d hh:mm-hh:mm`.

`d` represents the day of the working week (1 to 5, Monday to Friday).

`hh:mm-hh:mm` is the interval of time (Start/End included).

Solution:

```
1 13:00-13:59
```
