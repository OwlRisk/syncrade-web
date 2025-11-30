<#
.SYNOPSIS
    Reads the contents of a directory and writes them to a file,
    excluding the 'node_modules' folder. The script will also read the
    contents of each file and append them to the output file.

.DESCRIPTION
    This script uses Get-ChildItem to recursively list all files and
    folders within a specified directory. It uses the -Exclude parameter
    to ignore any folder named 'node_modules' and its contents. For each
    file found, it writes the file's path and then its full content to
    the output file, separated by a clear marker.

.NOTES
    Author: Gemini
    Date: August 30, 2025
    Version: 2.0
#>

# Define the root directory to search.
$targetDirectory = (Get-Location).Path

# Define the name and path for the output file.
$outputFile = "directory_listing_with_content_nodeJS.txt"

# Check if the target directory exists before proceeding.
if (-not (Test-Path -Path $targetDirectory -PathType Container)) {
    Write-Error "Error: The specified directory '$targetDirectory' does not exist."
    Exit
}

# Clear the output file to ensure a clean start.
Clear-Content -Path $outputFile

Write-Host "Starting directory scan of '$targetDirectory'..."
Write-Host "Excluding 'node_modules' folders."
Write-Host "Reading file contents and writing to '$outputFile'..."

# Get all files recursively, excluding the node_modules directory.
$files = Get-ChildItem -Path $targetDirectory -Recurse -File -Exclude "node_modules"

# Loop through each file and append its name and content to the output file.
foreach ($file in $files) {
    # Write a separator and the file path for clarity
    Add-Content -Path $outputFile -Value "=================================================="
    Add-Content -Path $outputFile -Value "File: $($file.FullName)"
    Add-Content -Path $outputFile -Value "=================================================="
    
    # Read the file content and append it to the output file
    # Get-Content reads the content line by line and outputs it to the pipeline.
    # We pipe it to Add-Content to write to the file.
    Get-Content -Path $file.FullName | Add-Content -Path $outputFile
    
    # Add an extra line break for readability between files
    Add-Content -Path $outputFile -Value "`n"
}

Write-Host "Scan complete."
Write-Host "The directory listing with file contents has been saved to '$outputFile'."
Write-Host "You can find the file at: $(Resolve-Path $outputFile)"
