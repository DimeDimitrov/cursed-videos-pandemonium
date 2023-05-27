Set objShell = CreateObject("WScript.Shell")
strScriptPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
strBatchFilePath = strScriptPath & "\files\script.bat"
objShell.Run "cmd /c cd /d " & strScriptPath & "\files && " & strBatchFilePath, 0, True
