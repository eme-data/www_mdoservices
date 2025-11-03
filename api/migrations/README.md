# Blog Enhancements Migration

This migration adds advanced features to the blog system:
- **Categories** for organizing posts
- **Tags** for flexible classification
- **Media Library** for managing uploaded images
- **Bulk Import** capability

## How to Run the Migration

### Option 1: Using PHP CLI (Recommended)

```bash
cd api/migrations
php run-blog-enhancements.php
```

### Option 2: Using MySQL CLI

```bash
cd api/migrations
mysql -u your_username -p your_database < blog_enhancements.sql
```

### Option 3: Using phpMyAdmin

1. Open phpMyAdmin
2. Select your database
3. Go to the "Import" tab
4. Upload the file `blog_enhancements.sql`
5. Click "Go"

## What This Migration Does

1. **Creates 4 new tables:**
   - `categories` - Blog post categories
   - `tags` - Flexible tagging system
   - `post_tags` - Many-to-many relationship between posts and tags
   - `media` - Uploaded images library

2. **Modifies the `posts` table:**
   - Adds `category_id` column (foreign key to categories)

3. **Inserts default categories:**
   - Actualités
   - Tutoriels
   - Cybersécurité
   - Cloud & Infrastructure
   - Télécom

## New API Endpoints

### Categories
- `GET /api/categories/list` - List all categories
- `POST /api/categories/create` - Create category (admin)
- `POST /api/categories/update` - Update category (admin)
- `POST /api/categories/delete` - Delete category (admin)

### Tags
- `GET /api/tags/list` - List all tags
- `POST /api/tags/create` - Create tag (admin)
- `POST /api/tags/delete` - Delete tag (admin)

### Media
- `POST /api/media/upload` - Upload image (requires authentication)
- `GET /api/media/list` - List all media (requires authentication)
- `POST /api/media/delete` - Delete media (admin)

### Import
- `POST /api/import/bulk` - Bulk import posts from JSON (admin)

## Troubleshooting

### Error: "Table already exists"
This is normal if you're running the migration multiple times. The script handles this gracefully.

### Error: "Cannot add foreign key constraint"
Make sure the `posts` table exists before running this migration.

### Permission Errors
Ensure your database user has the following permissions:
- CREATE TABLE
- ALTER TABLE
- INSERT
- SELECT

## Need Help?

Check the migration output for detailed information about what was created or skipped.
