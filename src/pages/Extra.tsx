import CachingScheme from '../assets/caching-scheme.png';
export const Extra = () => {
  return (
    <div className="page">
      <section className="extra-section">
        <h2>Caching</h2>
        <img src={CachingScheme} alt="" />
        <div className="cols">
          <div className="col">
            <h3>How cache works</h3>
            <ol>
              <li>Todo Query Instance A mounted</li>
              <li>Data fetched</li>
              <li>Data stored in cache</li>
              <li>Todo Query Instance B mounted</li>
              <li>Rendered data from cache</li>
              <li>Fetched and compared result with cache data</li>
              <li>Updated the UI</li>
            </ol>
          </div>
          <div className="col">
            <h3>How garbage collection works</h3>
            <ol>
              <li>Last Todo query instance unmounted</li>
              <li>GC timer statrted according to gcTime property (5 min by default)</li>
              <li>Timer elapsed</li>
              <li>Todo cache cleared</li>
            </ol>
          </div>
        </div>
        <div>
          <a href="https://tanstack.com/query/latest/docs/react/guides/caching">
            https://tanstack.com/query/latest/docs/react/guides/caching
          </a>
        </div>
      </section>
      <section className="extra-section">
        <h2>Pros & Cons</h2>
        <div className="cols">
          <div className="col">
            <h3>Pros</h3>
            <ol>
              <li>Automatic Caching and Synchronization</li>
              <li>Allows to get rid of local "server" state management</li>
              <li>Easy to use</li>
              <li>Built-in Error Handling</li>
              <li>Framework agnostic</li>
            </ol>
          </div>
          <div className="col">
            <h3>Cons</h3>
            <ol>
              <li>
                Adds inconvenience about server state by adding additional
                "source of truth"
              </li>
              <li>Not suitable for UI (non-server) state management</li>
              <li>
                Might get messy when many queries and mutations are present
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section className="extra-section">
        <h2>Uncovered topics</h2>
        <ol>
          <li>
            Parallel queries -{' '}
            <a href="https://tanstack.com/query/latest/docs/react/guides/parallel-queries">
              https://tanstack.com/query/latest/docs/react/guides/parallel-queries
            </a>
          </li>
          <li>
            Pagination -{' '}
            <a href="https://tanstack.com/query/latest/docs/react/guides/paginated-queries">
              https://tanstack.com/query/latest/docs/react/guides/paginated-queries
            </a>
          </li>
          <li>
            Infinite queries -{' '}
            <a href="https://tanstack.com/query/latest/docs/react/guides/infinite-queries">
              https://tanstack.com/query/latest/docs/react/guides/infinite-queries
            </a>
          </li>
          <li>
            Prefetching -{' '}
            <a href="https://tanstack.com/query/latest/docs/react/guides/prefetching">
              https://tanstack.com/query/latest/docs/react/guides/prefetching
            </a>
          </li>
          <li>
            SSR -{' '}
            <a href="https://tanstack.com/query/latest/docs/react/guides/ssr">
              https://tanstack.com/query/latest/docs/react/guides/ssr
            </a>
          </li>
        </ol>
      </section>
      <section className="extra-section">
        <h2>Useful links</h2>
        <ul>
          <li>
            Docs -{' '}
            <a href="https://tanstack.com/query/latest/docs/react/overview">
              https://tanstack.com/query/latest/docs/react/overview
            </a>
          </li>
          <li>
            Practical react query -{' '}
            <a href="https://tkdodo.eu/blog/practical-react-query">
              https://tkdodo.eu/blog/practical-react-query
            </a>
          </li>
          <li>
            TkDodo's blog -{' '}
            <a href="https://tkdodo.eu/blog/">https://tkdodo.eu/blog/</a>
          </li>
        </ul>
      </section>
    </div>
  );
};
