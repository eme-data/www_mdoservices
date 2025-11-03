<?php
/**
 * Media Endpoint - Upload Image
 *
 * POST /api/media/upload
 * Content-Type: multipart/form-data
 * Body: {
 *   "file": <file data>
 * }
 * Returns: { "success": true, "data": {...} }
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/utils.php';

setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

// Verify authentication
$auth = verifyAuth();
if (!$auth['valid']) {
    sendError($auth['error'], 401);
}

try {
    // Check if file was uploaded
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        sendError('No file uploaded or upload error', 400);
    }

    $file = $_FILES['file'];
    $originalFilename = basename($file['name']);
    $fileSize = $file['size'];
    $tmpPath = $file['tmp_name'];

    // Validate file size (max 10MB)
    $maxSize = 10 * 1024 * 1024; // 10MB
    if ($fileSize > $maxSize) {
        sendError('File size exceeds 10MB limit', 400);
    }

    // Get mime type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $tmpPath);
    finfo_close($finfo);

    // Validate mime type (images only)
    $allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml'
    ];

    if (!in_array($mimeType, $allowedMimeTypes)) {
        sendError('Invalid file type. Only images are allowed (JPEG, PNG, GIF, WebP, SVG)', 400);
    }

    // Get image dimensions (if not SVG)
    $width = null;
    $height = null;
    if ($mimeType !== 'image/svg+xml') {
        $imageInfo = getimagesize($tmpPath);
        if ($imageInfo !== false) {
            $width = $imageInfo[0];
            $height = $imageInfo[1];
        }
    }

    // Generate unique filename
    $extension = pathinfo($originalFilename, PATHINFO_EXTENSION);
    $filename = uniqid('img_', true) . '.' . strtolower($extension);

    // Create upload directory if it doesn't exist
    $uploadDir = __DIR__ . '/../../uploads/blog/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $filePath = $uploadDir . $filename;

    // Move uploaded file
    if (!move_uploaded_file($tmpPath, $filePath)) {
        sendError('Failed to save uploaded file', 500);
    }

    // Generate URL (adjust domain as needed)
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $fileUrl = $protocol . '://' . $host . '/uploads/blog/' . $filename;

    // Save to database
    $db = new Database();
    $sql = "INSERT INTO media (filename, original_filename, file_path, file_url, file_size, mime_type, width, height, uploaded_by)
            VALUES (:filename, :original_filename, :file_path, :file_url, :file_size, :mime_type, :width, :height, :uploaded_by)";

    $params = [
        'filename' => $filename,
        'original_filename' => $originalFilename,
        'file_path' => $filePath,
        'file_url' => $fileUrl,
        'file_size' => $fileSize,
        'mime_type' => $mimeType,
        'width' => $width,
        'height' => $height,
        'uploaded_by' => $auth['user']['username']
    ];

    $db->execute($sql, $params);
    $mediaId = $db->lastInsertId();

    // Get created media record
    $media = $db->queryOne("SELECT * FROM media WHERE id = :id", ['id' => $mediaId]);

    logMessage("Media uploaded: {$originalFilename} (ID: {$mediaId}) by user {$auth['user']['username']}", 'INFO');

    sendSuccess($media, 'File uploaded successfully');

} catch (Exception $e) {
    logMessage("Error uploading media: " . $e->getMessage(), 'ERROR');
    sendError('Failed to upload file', 500);
}
