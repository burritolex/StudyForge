@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM
@REM Required ENV vars:
@REM JAVA_HOME - location of a JDK home dir
@REM
@REM Optional ENV vars
@REM MAVEN_BATCH_ECHO - set to 'on' to enable the echoing of the input commands
@REM MAVEN_BATCH_PAUSE - set to 'on' to pause at the end of this script
@REM MAVEN_OPTS - parameters to passed to the Java VM when running Maven
@REM     e.g. to debug Maven itself, use
@REM set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
@REM MAVEN_SKIP_RC - flag to disable loading of mavenrc files
@REM ----------------------------------------------------------------------------

@REM Begin all REM lines with '@' in case MAVEN_BATCH_ECHO is 'on'
@echo off
@rem set %ERRORLEVEL% to 0
set ERRORLEVEL=0

@rem To isolate internal variables from possible post configs, we use another setlocal
@setlocal

@rem Execute a user defined script before this one
if not "%MAVEN_SKIP_RC%"=="" goto skipRcPre
@rem Personal execute-pre.bat
if exist "%USERPROFILE%\mavenrc_pre.bat" call "%USERPROFILE%\mavenrc_pre.bat"
@rem Global execute-pre.bat
if exist "%ALLUSERSPROFILE%\mavenrc_pre.cmd" call "%ALLUSERSPROFILE%\mavenrc_pre.cmd"
:skipRcPre

@setlocal

set ERROR_CODE=0

@REM ==== START VALIDATION ====
@REM Look for JAVA_HOME first, then default to java on PATH
if not "%JAVA_HOME%"=="" goto OkJHome
for %%i in (java.exe) do set "JAVACMD=%%~$PATH:i"
if not "%JAVACMD%"=="" goto checkJCmd

:OkJHome
set "JAVACMD=%JAVA_HOME%\bin\java.exe"

:checkJCmd
if exist "%JAVACMD%" goto init

echo Error: JAVA_HOME is not defined correctly.
echo We cannot execute %JAVACMD%
goto error

@REM ==== END VALIDATION ====

:init

set MAVEN_CMD_LINE_ARGS=%*

@REM ----------------------------------------------------------------------------
@REM Maven Wrapper properties and home setup
@REM ----------------------------------------------------------------------------
set WRAPPER_JAR="%~dp0\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_PROPERTIES="%~dp0\.mvn\wrapper\maven-wrapper.properties"

@REM Download Maven distribution if wrapper jar or maven not cached
set "MAVEN_USER_HOME=%USERPROFILE%\.m2"
set "MAVEN_HOME=%MAVEN_USER_HOME%\wrapper\dists\apache-maven-3.9.9"

if exist "%MAVEN_HOME%\bin\mvn.cmd" goto runMaven

@REM Use PowerShell to download and extract maven
echo Maven distribution not found. Downloading Apache Maven 3.9.9...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $zip = Join-Path $env:TEMP 'apache-maven-3.9.9-bin.zip'; Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.9/apache-maven-3.9.9-bin.zip' -OutFile $zip; Expand-Archive -Path $zip -DestinationPath (Join-Path $env:USERPROFILE '.m2\wrapper\dists') -Force; Remove-Item $zip"

:runMaven
set "MVN_CMD=%MAVEN_HOME%\bin\mvn.cmd"
if not exist "%MVN_CMD%" (
    @REM Try nested folder if expanded with root directory
    for /d %%D in ("%MAVEN_USER_HOME%\wrapper\dists\apache-maven-3.9.9*") do (
        if exist "%%D\bin\mvn.cmd" set "MVN_CMD=%%D\bin\mvn.cmd"
    )
)

if not exist "%MVN_CMD%" (
    echo Error: Failed to locate mvn.cmd in wrapper directory.
    goto error
)

"%MVN_CMD%" %MAVEN_CMD_LINE_ARGS%
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
exit /B %ERROR_CODE%
