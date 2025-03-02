from re import sub
import json
from datetime import date


def getSlug(s: str) -> str:
    s = s.lower().strip()
    s = sub(r'[^\w\s-]', '', s)
    s = sub(r'[\s_-]+', '-', s)
    s = sub(r'^-+|-+$', '', s)
    return s


def new():
    category = input("Enter category: ")
    if category not in ['aws', 'go', 'java', 'python', 'rust', 'others', 'spring']:
        print("Category Not Supported")
        return

    title = input("Enter title: ")
    tag = input("Enter tags separated by comma: ")
    author = input("Enter author: ")

    to_day = date.today()

    slug = getSlug(title)

    with open("./posts/config.json", "r") as f:
        config_data = json.load(f)

    idx = [x for x in range(len(config_data))
           if config_data[x]['name'] == category][0]

    config_data[idx]['posts'].append({
        "title": title,
        "slug": slug,
        "tags": tag.split(","),
        "description": ""
    })

    with open("./posts/config.json", "w") as f:
        json.dump(config_data, f, indent=2)

    with open(f"./posts/{category}/{slug}.md", "w") as f:
        template = """---
        title: {title}
        slug: {slug}
        date: '{date}'
        authors: 
            - {author}
        relates:
        ---
        """
        f.write(template.format(title=title, slug=slug,
                date=to_day, author=author))


if __name__ == "__main__":
    new()
