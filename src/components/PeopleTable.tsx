import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  resolveRelative: (name: string) => Person | null;
};

export const PeopleTable = ({
  people,
  selectedSlug,
  onSelect,
  resolveRelative,
}: Props) => {
  const renderRelative = (name?: string | null) => {
    if (!name) {
      return <span>-</span>;
    }

    const rel = resolveRelative(name);

    if (!rel) {
      return <span>{name}</span>;
    }

    return (
      <Link
        to={`/people/${rel.slug}`}
        className={rel.sex === 'f' ? 'has-text-danger' : 'has-text-link'}
      >
        {name}
      </Link>
    );
  };

  return (
    <tbody>
      {people.map(p => (
        <tr
          key={p.slug}
          data-cy="person"
          className={p.slug === selectedSlug ? 'has-background-warning' : ''}
          onClick={() => onSelect(p.slug)}
          style={{ cursor: 'pointer' }}
        >
          <td>
            <Link
              to={`/people/${p.slug}`}
              className={p.sex === 'f' ? 'has-text-danger' : 'has-text-link'}
            >
              {p.name}
            </Link>
          </td>
          <td>{p.sex}</td>
          <td>{p.born}</td>
          <td>{p.died}</td>
          <td>{renderRelative(p.motherName)}</td>
          <td>{renderRelative(p.fatherName)}</td>
        </tr>
      ))}
    </tbody>
  );
};
