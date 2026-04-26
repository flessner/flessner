import { CornerFrame } from "~/_design/components/CornerFrame";
import { Footer } from "~/_design/components/Footer";
import { Link } from "~/_design/components/Link";
import { Page } from "~/_design/components/Page";
import { Section } from "~/_design/components/Section";

export default function Home() {
  return (
    <Page>
      <CornerFrame>
        <h1>Torben Alexander Flessner</h1>
        <p className="text-(--accent)">
          digital economics @ karlsruhe institute of technology
        </p>
      </CornerFrame>

      <Section title="projects">
        <div className="grid grid-cols-[13ch_1fr] gap-x-3">
          <Link href="https://chatglot.com" external>
            chatglot
          </Link>
          <span className="text-(--accent)">next generation language learning engine</span>
          <Link href="https://prinion.com" external>
            prinion
          </Link>
          <span className="text-(--accent)">experimental merchandise designer</span>
        </div>
      </Section>

      <Section title="meta">
        <div>
          <Link
            href="https://uma.flessner.dev/share/JvjfsBaMwZy7A4ul"
            external
          >
            analytics
          </Link>
        </div>
      </Section>

      <Section title="elsewhere">
        <div className="grid grid-cols-[13ch_1fr] gap-x-3">
          <Link href="https://github.com/flessner" external>
            github
          </Link>
          <span className="text-(--accent)">flessner</span>
          <Link href="https://news.ycombinator.com/user?id=flessner" external>
            hacker news
          </Link>
          <span className="text-(--accent)">flessner</span>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
