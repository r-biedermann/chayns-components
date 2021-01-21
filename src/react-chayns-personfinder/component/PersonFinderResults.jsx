import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import ResultItemList from './ResultItemList';

const PersonFinderResults = ({
    data,
    orm,
    value: inputValue,
    hasMore,
    onLoadMore,
    showWaitCursor,
    onSelect,
    focusIndex,
    noBackground,
    roundIcons,
}) => {
    const handleClick = useCallback(
        (value) => {
            if (onSelect) {
                onSelect(value.type, value.relation);
            }
        },
        [onSelect]
    );

    let length = 0;
    if (Array.isArray(orm.groups)) {
        return orm.groups.map(({ key: group, lang, show }) => {
            if (typeof show === 'function' && !show(inputValue)) {
                return null;
            }
            const groupData =
                typeof orm.filter === 'function'
                    ? (data[group] || []).filter(orm.filter(inputValue))
                    : data[group] || [];
            const groupLength = groupData.length;
            length += groupLength;
            let groupFocusIndex = null;
            if (
                length - groupLength <= focusIndex &&
                focusIndex < length &&
                focusIndex !== null
            ) {
                groupFocusIndex = focusIndex - (length - groupLength);
            }
            return (
                <div
                    className={classNames('cc__person-finder__results', {
                        'no-background': noBackground,
                    })}
                    key={`resultList_${group}`}
                >
                    <ResultItemList
                        data={groupData}
                        orm={orm}
                        group={group}
                        separator={lang[chayns.env.language] || lang.en}
                        hasMore={hasMore[group]}
                        onLoadMore={onLoadMore}
                        showWaitCursor={showWaitCursor[group]}
                        onClick={handleClick}
                        focusIndex={groupFocusIndex}
                        roundIcons={roundIcons}
                    />
                </div>
            );
        });
    }

    return (
        <div
            className={classNames('cc__person-finder__results', {
                'no-background': noBackground,
            })}
        >
            <ResultItemList
                data={
                    typeof orm.filter === 'function'
                        ? data.filter(orm.filter(inputValue))
                        : data
                }
                orm={orm}
                hasMore={hasMore}
                onLoadMore={onLoadMore}
                showWaitCursor={showWaitCursor}
                onClick={handleClick}
                focusIndex={focusIndex}
                roundIcons={roundIcons}
            />
        </div>
    );
};

PersonFinderResults.propTypes = {
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
        // eslint-disable-next-line react/forbid-prop-types
        groups: PropTypes.array,
        filter: PropTypes.func,
    }).isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
    ]),
    value: PropTypes.string,
    onSelect: PropTypes.func,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.bool),
        PropTypes.bool,
    ]),
    showWaitCursor: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.bool),
        PropTypes.bool,
    ]),
    focusIndex: PropTypes.number,
    noBackground: PropTypes.bool,
    roundIcons: PropTypes.bool,
};

PersonFinderResults.defaultProps = {
    data: [],
    value: '',
    onSelect: null,
    hasMore: false,
    showWaitCursor: false,
    focusIndex: null,
    noBackground: false,
    roundIcons: false,
};

PersonFinderResults.displayName = 'PersonFinderResults';

export default PersonFinderResults;
