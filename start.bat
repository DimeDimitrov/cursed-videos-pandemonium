@echo off
set videoCount=3
set mpv="mpv --window-scale=0.8 --force-window-position=yes --ontop --ytdl-format="bestvideo[height<=360]+bestaudio/best[height<=360]" --loop-file=inf --no-input-default-bindings --no-osc"

for /f %%i in (links.txt) do (
  set "link=!link! %%i"
)

for /l %%x in (1,1,%videoCount%) do (
  setlocal enabledelayedexpansion
  call :getRandomLink
  %mpv% !link!
  if errorlevel 1 (
    echo Error occurred while playing video: !link!
  )
  endlocal
  if %%x==%videoCount% goto :eof
)

:getRandomLink
set /a "rand=%random% %% %numLines% + 1"
for /f "skip=%rand% delims=" %%y in (links.txt) do (
  set "link=%%y"
  goto :eof
)
