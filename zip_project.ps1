$backendSource = 'C:\Users\aashk\Desktop\project1\backend'
$backendZip = 'C:\Users\aashk\Desktop\project1_backend.zip'
if (Test-Path $backendZip) { Remove-Item $backendZip -Force }
# We include .env now as requested
Get-ChildItem -Path $backendSource -Exclude 'node_modules' | ForEach-Object {
    Compress-Archive -Path $_.FullName -DestinationPath $backendZip -Update
}

$frontendSource = 'C:\Users\aashk\Desktop\project1\frontend\dist'
$frontendZip = 'C:\Users\aashk\Desktop\project1_frontend.zip'
if (Test-Path $frontendZip) { Remove-Item $frontendZip -Force }
Get-ChildItem -Path $frontendSource | ForEach-Object {
    Compress-Archive -Path $_.FullName -DestinationPath $frontendZip -Update
}

$adminSource = 'C:\Users\aashk\Desktop\project1\admin\dist'
$adminZip = 'C:\Users\aashk\Desktop\project1_admin.zip'
if (Test-Path $adminZip) { Remove-Item $adminZip -Force }
Get-ChildItem -Path $adminSource | ForEach-Object {
    Compress-Archive -Path $_.FullName -DestinationPath $adminZip -Update
}

Write-Output "Zips completed successfully with .env!"
