const {
  cmd,
  commands
} = require("../command");
const path = require('path');

let savedStatus = null;  // Store the saved status file

cmd({
  'pattern': "save",
  'react': '📁',
  'desc': "Save your WhatsApp status for later forwarding.",
  'category': "media",
  'use': ".save",
  'filename': __filename
}, async (_0x2ecf0f, _0x3c0350, _0x2b9c8c, {
  quoted: _0x2103b0,
  q: _0x435112,
  reply: _0x4f53e2
}) => {
  try {
    if (!_0x2103b0) {
      return _0x4f53e2("❌ Reply to a media status (image, video, or audio) with the `.save` command.");
    }

    const _0x3debb4 = _0x2103b0.mtype;
    let _0x21e1be;
    
    // Check for media type (image, video, or audio)
    if (/video/.test(_0x3debb4)) {
      _0x21e1be = "video";
    } else if (/image/.test(_0x3debb4)) {
      _0x21e1be = "image";
    } else if (/audio/.test(_0x3debb4)) {
      _0x21e1be = 'audio';
    } else {
      return _0x4f53e2("❌ Only video, image, or audio status are supported.");
    }

    // Save the status media
    const _0x1a523a = await _0x2ecf0f.downloadAndSaveMediaMessage(_0x2103b0);
    savedStatus = path.resolve(_0x1a523a);  // Save the media path

    await _0x4f53e2("✅ Status saved successfully!");
  } catch (_0x1791ca) {
    console.error(_0x1791ca);
    _0x4f53e2("❌ Failed to save the status. Please try again.");
  }
});

// Forward the saved status when someone asks for it
cmd({
  'pattern': "getstatus",
  'react': '📤',
  'desc': "Get the saved WhatsApp status.",
  'category': "media",
  'use': ".getstatus",
  'filename': __filename
}, async (_0x2ecf0f, _0x3c0350, _0x2b9c8c, {
  reply: _0x4f53e2
}) => {
  try {
    if (!savedStatus) {
      return _0x4f53e2("❌ No saved status available.");
    }

    // Send the saved status to the requester
    const mediaMessage = {
      [savedStatus.endsWith('.mp4') ? 'video' : savedStatus.endsWith('.jpg') || savedStatus.endsWith('.png') ? 'image' : 'audio']: {
        url: 'file://' + savedStatus
      }
    };

    await _0x2ecf0f.sendMessage(_0x2b9c8c.sender, mediaMessage);
    await _0x4f53e2("✅ Status forwarded!");
  } catch (_0x1791ca) {
    console.error(_0x1791ca);
    _0x4f53e2("❌ Failed to forward the status. Please try again.");
  }
});
