Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\JoseLuis\OneDrive\Desktop\Saneamientos\web\public\logo.png"
$destPath = "c:\Users\JoseLuis\OneDrive\Desktop\Saneamientos\web\public\logo-nobg.png"

# Load the image
$img = [System.Drawing.Bitmap]::FromFile($sourcePath)

# Create a clean bitmap to avoid file lock issues if overwriting (though we use a new name)
$bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, 0, 0, $img.Width, $img.Height)

# Make white transparent
# We accept a small variance? No, standard MakeTransparent is exact.
# Let's try exact white first.
$bmp.MakeTransparent([System.Drawing.Color]::White)

# Save
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Logo background removed."
