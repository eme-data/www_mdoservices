<?php
/**
 * Run Blog Enhancements Migration
 *
 * This script creates the tables for categories, tags, and media
 * Run this file once to set up the new blog features
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/Database.php';

echo "Starting blog enhancements migration...\n\n";

try {
    $db = new Database();

    // Read the SQL file
    $sql = file_get_contents(__DIR__ . '/blog_enhancements.sql');

    // Split into individual statements
    $statements = array_filter(
        array_map('trim', explode(';', $sql)),
        function($stmt) {
            return !empty($stmt) && !preg_match('/^\s*--/', $stmt);
        }
    );

    $successCount = 0;
    $errorCount = 0;

    foreach ($statements as $statement) {
        try {
            $db->execute($statement);
            $successCount++;

            // Extract table/action name for display
            if (preg_match('/CREATE TABLE.*?`?(\w+)`?/i', $statement, $matches)) {
                echo "✓ Created table: {$matches[1]}\n";
            } elseif (preg_match('/ALTER TABLE.*?`?(\w+)`?/i', $statement, $matches)) {
                echo "✓ Altered table: {$matches[1]}\n";
            } elseif (preg_match('/INSERT.*?INTO.*?`?(\w+)`?/i', $statement, $matches)) {
                echo "✓ Inserted default data into: {$matches[1]}\n";
            } else {
                echo "✓ Executed statement\n";
            }

        } catch (Exception $e) {
            $errorCount++;
            $errorMsg = $e->getMessage();

            // Ignore "already exists" errors
            if (strpos($errorMsg, 'already exists') !== false ||
                strpos($errorMsg, 'Duplicate') !== false) {
                echo "⚠ Skipped (already exists)\n";
                $errorCount--;
                continue;
            }

            echo "✗ Error: " . $errorMsg . "\n";
        }
    }

    echo "\n========================================\n";
    echo "Migration completed!\n";
    echo "Successful operations: $successCount\n";
    echo "Errors: $errorCount\n";
    echo "========================================\n\n";

    if ($errorCount === 0) {
        echo "✓ All tables created successfully!\n";
        echo "You can now use the new blog features:\n";
        echo "  - Categories\n";
        echo "  - Tags\n";
        echo "  - Media library\n";
        echo "  - Import tools\n\n";
    }

} catch (Exception $e) {
    echo "✗ Fatal error: " . $e->getMessage() . "\n";
    exit(1);
}
