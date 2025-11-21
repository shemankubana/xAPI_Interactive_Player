# Rise 360 Code Block Integration Instructions

This Interactive Video Player has been optimized for use with Rise 360's Code Block feature.

## What's Been Changed for Rise 360 Compatibility

The following modifications have been made to ensure compatibility with Rise 360:

1. **Removed External Web Requests**: The Google Fonts link has been removed and replaced with system fonts
2. **Transparent Background**: The background is now transparent to blend seamlessly with Rise 360's interface
3. **Completion Tracking**: Added `window.parent.postMessage({ type: 'complete' }, '*');` to notify Rise 360 when the video ends
4. **Iframe Compatibility**: All assets are self-contained for proper iframe operation

## How to Package for Rise 360

### Step 1: Create a ZIP File

1. Ensure `index.html` is at the **root level** of your project (not in a subfolder)
2. Include all necessary folders:
   - `assets/` - Contains your video file and poster image
   - `scripts/` - Contains all JavaScript files
   - `styles/` - Contains all CSS files
3. Create a ZIP file with the following structure:

```
interactive-video-player.zip
├── index.html
├── assets/
│   ├── sample-vid.mp4 (or your video)
│   └── poster.png
├── scripts/
│   ├── config.js
│   ├── custom.js
│   └── player/
│       └── (all player scripts)
└── styles/
    ├── custom.css
    ├── player.css
    └── player/
        └── (all player styles)
```

**Important**: The `index.html` file must be at the root level of the ZIP file, not inside any folder.

### Step 2: Upload to Rise 360

1. Open your Rise 360 course
2. Edit an existing lesson or create a new one
3. Click **All Blocks** from the blocks shortcut bar
4. Select the **Code** category
5. Choose **Upload project**
6. Upload your ZIP file
7. The interactive video player will load immediately

## Customizing Your Video Player

### Changing the Video

You have two options for hosting your video:

#### Option 1: Use a URL (Recommended)

This option keeps your ZIP file small and allows you to update the video without re-uploading the entire package.

1. Upload your video to a hosting service (Vimeo, YouTube, AWS S3, CDN, etc.)
2. Get the direct video URL (must be an MP4 file URL, not an embed link)
3. Update the `scripts/config.js` file:

```javascript
var _iv_config = {
  title: "Your Video Title",
  description: "Your video description",
  source: 'https://your-domain.com/path-to-your-video.mp4',
  poster_image_url: 'https://your-domain.com/path-to-poster.jpg',
  // ... rest of configuration
};
```

**Important Notes for URL Option:**
- Use direct video file URLs (ending in .mp4, .webm, etc.)
- Ensure your video hosting allows CORS (Cross-Origin Resource Sharing)
- The video host must support HTTPS
- YouTube/Vimeo embed links won't work - you need direct file URLs

#### Option 2: Include Video in ZIP

This option includes the video directly in your package but increases file size.

1. Replace `assets/sample-vid.mp4` with your video file
2. Update `assets/poster.png` with a screenshot from your video
3. Update the `scripts/config.js` file:

```javascript
var _iv_config = {
  title: "Your Video Title",
  description: "Your video description",
  source: './assets/your-video.mp4',
  poster_image_url: './assets/poster.png',
  // ... rest of configuration
};
```

### Adding Questions

Questions are configured in `scripts/config.js` in the `markers` array. See the existing configuration for examples of:

- **Multiple Choice Questions**: Questions with single correct answers
- **Information Popups**: Display additional information at specific timestamps
- **True/False Questions**: Simple binary choice questions

### xAPI Configuration

If you want to track learner data with xAPI:

1. Set `x_api: true` in `scripts/config.js`
2. Configure your LRS endpoint credentials:

```javascript
x_api_endpoint: "https://your-lrs-endpoint.com",
x_api_username: "your-username",
x_api_password: "your-password",
```

To disable xAPI tracking, set `x_api: false`.

## Completion Requirements

The player automatically sends a completion signal to Rise 360 when:
- The video reaches the end
- All questions have been answered (if applicable)

This allows you to use Rise 360's **Continue Blocks** to prevent learners from proceeding until they've completed the video activity.

## Testing Your Code Block

1. **Preview in Rise 360**: Use the preview function to test your code block within Rise 360
2. **Test Completion**: Ensure the completion tracking works with Continue blocks
3. **Check Responsiveness**: Verify the player displays correctly on different screen sizes

## Known Limitations

- **PDF Export**: Code blocks don't export well to PDF format
- **Local Preview**: Code blocks published for LMS or web can't be previewed locally but will work when uploaded to your training host
- **External Resources**: While video and image URLs are supported by the HTML5 video player, other external API requests should be avoided. Google Fonts and similar external dependencies have been removed for compatibility.

## Troubleshooting

### Video Won't Load

**For URL-hosted videos:**
- Verify the URL is a direct link to an MP4 file (not a webpage or embed code)
- Check that the video host supports CORS (Cross-Origin Resource Sharing)
- Ensure the URL uses HTTPS (not HTTP)
- Test the URL in a browser to confirm it's accessible
- Check browser console for CORS or network errors

**For locally-hosted videos:**
- Ensure your video file is in MP4 format
- Check that the path in `config.js` matches your video filename exactly
- Verify the video file is included in the ZIP at the correct path
- Confirm the video is in the `assets/` folder

### Completion Not Tracking
- Make sure you've enabled completion requirements in Rise 360
- Verify the Continue block is properly configured
- Check browser console for any JavaScript errors

### Styling Issues
- The background is transparent by default to blend with Rise 360
- If you need a solid background, modify `styles/player.css` line 6

## File Size Considerations

- Maximum ZIP file size: 5 GB
- **Best Practice**: Use URL-hosted videos to keep your ZIP file small (typically < 5 MB)
- If including video in ZIP, optimize video files for web delivery
- Consider using compressed/optimized video formats (H.264 codec recommended)
- Remove any unnecessary files before creating the ZIP
- Large video files can be slow to upload and may cause issues with Rise 360

## Support

For issues specific to this video player, refer to the main README.md file.
For Rise 360-specific questions, consult the Rise 360 documentation or Articulate support.
